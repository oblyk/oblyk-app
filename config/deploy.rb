# config valid for current version and patch releases of Capistrano
lock "~> 3.14.1"

set :application, "oblyk"
set :repo_url, "git@github.com:oblyk/oblyk-app.git"
set :linked_files, fetch(:linked_files, []).push('.env', 'static/.well-known/assetlinks.json')
set :linked_dirs, fetch(:linked_dirs, []).push('node_modules', 'log')
set :npm_method, 'ci'
set :npm_flags, '--silent --no-progress'
set :keep_releases, 5

before 'deploy:reverted', 'npm:install'
after 'deploy:reverted', 'app:publish_assets'
after 'deploy:updated', 'app:build'
after 'deploy:updated', 'app:publish_assets'
after 'deploy:publishing', 'app:restart'
after 'deploy:finished', 'app:clean_assets'

set :systemd_service, 'oblyk-app'
set :app_ports, [3000, 3001]
set :assets_retention_days, 30

namespace :app do
  desc 'Build the app'
  task :build do
    on release_roles('app') do
      within release_path do
        execute :npm, 'run build'
      end
    end
  end

  desc 'Copy client assets to a shared dir (keeps old builds available)'
  task :publish_assets do
    on release_roles('app') do
      assets = shared_path.join('_nuxt')
      execute :mkdir, '-p', assets
      execute :cp, '-R', "#{release_path}/.nuxt/dist/client/.", assets
    end
  end

  desc 'Delete shared assets not published for N days'
  task :clean_assets do
    on release_roles('app') do
      execute :find, shared_path.join('_nuxt'),
              "-type f -mtime +#{fetch(:assets_retention_days)} -delete"
    end
  end

  desc 'Rolling restart of systemd instances'
  task :restart do
    on release_roles('app') do
      fetch(:app_ports).each do |port|
        unit = "#{fetch(:systemd_service)}@#{port}"
        info "Restarting #{unit}"
        execute :sudo, :systemctl, 'restart', unit

        # Attend que Nuxt réponde avant de passer à l'instance suivante
        ready = false
        60.times do
          if test(:curl, '-s', '-o', '/dev/null', "http://127.0.0.1:#{port}/")
            ready = true
            break
          end
          sleep 1
        end
        raise "#{unit} ne répond pas après 60s" unless ready
        info "#{unit} OK"
      end
    end
  end

  desc 'Status of systemd instances'
  task :status do
    on release_roles('app') do
      fetch(:app_ports).each do |port|
        execute :sudo, :systemctl, 'status', "#{fetch(:systemd_service)}@#{port}", raise_on_non_zero_exit: false
      end
    end
  end
end
