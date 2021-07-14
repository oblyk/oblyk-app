# config valid for current version and patch releases of Capistrano
lock "~> 3.14.1"

set :application, "oblyk-app"
set :repo_url, "git@github.com:lucien-chastan/oblyk-app.git"
set :linked_files, fetch(:linked_files, []).push('.env', '.env.local')
set :linked_dirs, fetch(:linked_dirs, []).push('node_modules')
set :npm_method, 'ci'
set :keep_releases, 5

after 'deploy:updated', 'app:build'
after 'deploy:publishing', 'pm2:restart'
before 'deploy:reverted', 'npm:install'

namespace :pm2 do
  desc 'Start or restart pm2'
  task :restart do
    on roles(fetch(:pm2_role)) do |role|
      within current_path do
        execute :npm, "run start"
      end
    end
  end
end

namespace :app do
  desc 'Build the app'
  task :build do
    on release_roles('app') do
      within "#{release_path}" do
        execute :npm, 'run build'
      end
    end
  end
end
