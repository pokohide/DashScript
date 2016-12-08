require 'capybara'
require 'capybara/dsl'
require 'capybara/poltergeist'

Capybara.configure do |config|
  config.run_server = false
  config.current_driver = :poltergeist
  config.javascript_driver = :poltergeist
  config.default_wait_time = 5
  config.default_selector = :xpath
end

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, {
      js_errors: false,
      timeout: 2000,
      phantomjs_options: [
        '--load-images=no',
        '--ignore-ssl-errors=yes',
        '--ssl-protocol=any'
      ]
    })
end

module DashScript
  class Amazon
    include Capybara::DSL
    def initialize
      @root = 'https://amazon.co.jp'
    end

    def signin
      p 1
      visit(@root)
      page.save_screenshot('hoge.png', full: true)
      find(:xpath, '//a[@id="nav-link-yourAccount"]').trigger('click')
      p 3
      wait_for_ajax
      p 2

      within('//form[@class="fwcim-form"]') do
        fill_in 'ap_email', with: 'hyde14142@gmail.com'
        fill_in 'ap_password', with: 'a7417537'
        find_button('サインイン').trigger('click')
      end

      page.save_screenshot('hogeaaa.png', full: true)
    end

    private

    # javascriptロードのための待機時間
    def wait_for_ajax

    Timeout.timeout(Capybara.default_wait_time) do
      loop do
        sleep 0.1
        break if finished_all_ajax_requests?
      end
    end

  def finished_all_ajax_requests?
    page.evaluate_script('jQuery.active')&.zero?
  end

    end
  end
end

DashScript::Amazon.new().signin

