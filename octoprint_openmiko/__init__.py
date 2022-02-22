# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin


class OpenmikoPlugin(octoprint.plugin.AssetPlugin):

    # ~~ AssetPlugin mixin

    def get_assets(self):
        return {
            "js": ["js/openmiko.js"],
        }

    # ~~ Softwareupdate hook

    def get_update_information(self):
        # Define the configuration for your plugin to use with the Software Update
        # Plugin here. See https://docs.octoprint.org/en/master/bundledplugins/softwareupdate.html
        # for details.
        return {
            "openmiko": {
                "displayName": "OpenMiko Plugin",
                "displayVersion": self._plugin_version,

                # version check: github repository
                "type": "github_release",
                "user": "tmountjr",
                "repo": "OctoPrint-Openmiko",
                "current": self._plugin_version,

                # update method: pip
                "pip": "https://github.com/tmountjr/OctoPrint-Openmiko/archive/{target_version}.zip",
            }
        }


# If you want your plugin to be registered within OctoPrint under a different name than what you defined in setup.py
# ("OctoPrint-PluginSkeleton"), you may define that here. Same goes for the other metadata derived from setup.py that
# can be overwritten via __plugin_xyz__ control properties. See the documentation for that.
__plugin_name__ = "OpenMiko Plugin"


# Set the Python version your plugin is compatible with below. Recommended is Python 3 only for all new plugins.
# OctoPrint 1.4.0 - 1.7.x run under both Python 3 and the end-of-life Python 2.
# OctoPrint 1.8.0 onwards only supports Python 3.
__plugin_pythoncompat__ = ">=3,<4"  # Only Python 3

__plugin_implementation__ = OpenmikoPlugin()

def __plugin_load__():
    global __plugin_hooks__
    __plugin_hooks__ = {
        "octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
    }
