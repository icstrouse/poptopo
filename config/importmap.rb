# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "mapbox-gl" # @3.9.2
pin "@maptiler/ar-control", to: "@maptiler--ar-control.js" # @3.0.2
pin "@capacitor-community/file-opener", to: "@capacitor-community--file-opener.js" # @1.0.6
pin "@capacitor/core", to: "@capacitor--core.js" # @5.7.8
pin "@capacitor/filesystem", to: "@capacitor--filesystem.js" # @5.2.2
pin "@google/model-viewer", to: "@google--model-viewer.js" # @3.5.0
pin "@lit/reactive-element", to: "@lit--reactive-element.js" # @1.6.3
