# frozen_string_literal: true

server 'server-ip', user: 'user', roles: %w[app]

set :deploy_to, '/path/to/app/'

# Deploy with master branch
set :branch, 'master'
