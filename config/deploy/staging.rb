# frozen_string_literal: true

server 'next.oblyk.org', user: 'lucien', roles: %w[app], port: 1622

set :deploy_to, '/var/www/oblyk-next/app'

# Deploy with staging branch
set :branch, 'staging'
