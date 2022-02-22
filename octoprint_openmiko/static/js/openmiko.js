/*
 * View model for OctoPrint-OpenMiko
 *
 * Author: Tom Mount
 * License: MIT
 */
$(function() {
    function OpenmikoViewModel(parameters) {
        var self = this;
        self.settingsViewModel = parameters[0];

        self.getAdditionalControls = function() {
            var streamUrl = self.settingsViewModel.settings.webcam.streamUrl();
            var parsedUrl = new URL(streamUrl);
            var apiUrl = parsedUrl.protocol + '//' + parsedUrl.hostname+ ':8081/api';

            /**
             * Post a value to a url.
             * @param {*} url The URL to post to.
             * @param {*} data The value to post.
             * @returns {Promise}
             */
            function post(url, data) {
                return new Promise(function(resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', url);
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhr.onload = function() {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            resolve(xhr.response);
                        } else {
                            reject({
                                status: xhr.status,
                                statusText: xhr.statusText,
                                url,
                            });
                        }
                    };
                    xhr.onerror = function() {
                        reject({
                            status: xhr.status,
                            statusText: xhr.statusText,
                            url
                        });
                    };
                    xhr.send('value=' + data);
                });
            }

            /**
             * Enable Day Mode by switching off the IR leds and enabling the IR cutoff filter.
             */
            var dayMode = function() {
                var urls = [
                    { url: apiUrl + '/ir_cut', value: 1 },
                    { url: apiUrl + '/ir_led', value: 0 },
                ];
                Promise.allSettled(urls.map(u => post(u.url, u.value)))
                    .catch(function(e) {
                        console.log('Failure.');
                        console.log(e);
                    })
                    .then(function() {
                        console.log('Success!');
                    });
            };

            /**
             * Enable Night Mode by switching on the IR leds and disabling the IR cutoff filter.
             */
            var nightMode = function() {
                var urls = [
                    { url: apiUrl + '/ir_cut', value: 0},
                    { url: apiUrl + '/ir_led', value: 1},
                ];
                Promise.all(urls.map(u => post(u.url, u.value)))
                    .catch(function(e) {
                        console.log('Failure.');
                        console.log(e);
                    })
                    .then(function() {
                        console.log('Success!');
                    });
            };

            return [
                { name: "OpenMiko", type: "section", layout: "horizontal", children: [
                    { name: "Day Mode", type: "javascript", javascript: dayMode, enabled: true },
                    { name: "Night Mode", type: "javascript", javascript: nightMode, enabled: true }
                ], },
            ];
        };
    }

    OCTOPRINT_VIEWMODELS.push({
        construct: OpenmikoViewModel,
        dependencies: ["settingsViewModel"],
        elements: [],
    });
});
