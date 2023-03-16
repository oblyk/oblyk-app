# config valid for current version and patch releases of Capistrano
lock "~> 3.16.0"

set :application, "oblyk"
set :repo_url, "git@github.com:oblyk/oblyk-app.git"
set :linked_files, fetch(:linked_files, []).push('.env', 'ecosystem.config.js', 'static/.well-known/assetlinks.json')
set :linked_dirs, fetch(:linked_dirs, []).push('node_modules', 'log')
set :npm_method, 'ci'
set :pm2_role, 'app'
set :pm2_processname, 'oblyk-app'
set :npm_flags, '--silent --no-progress'
set :keep_releases, 5

before 'deploy:reverted', 'npm:install'
after 'deploy:updated', 'app:build'

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
