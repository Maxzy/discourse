Discourse.AdminSiteSettingsCategoryController = Ember.ObjectController.extend({
  categoryNameKey: null,
  needs: ['adminSiteSettings'],

  filteredContent: function() {
    if (!this.get('categoryNameKey')) { return Em.A(); }

    var category = this.get('controllers.adminSiteSettings.content').find(function(siteSettingCategory) {
      return siteSettingCategory.nameKey === this.get('categoryNameKey');
    }, this);

    if (category) {
      return category.siteSettings;
    } else {
      return Em.A();
    }
  }.property('controllers.adminSiteSettings.content', 'categoryNameKey'),

  actions: {

    /**
      Reset a setting to its default value

      @method resetDefault
      @param {Discourse.SiteSetting} setting The setting we want to revert
    **/
    resetDefault: function(setting) {
      setting.set('value', setting.get('default'));
      setting.save();
    },

    /**
      Save changes to a site setting

      @method save
      @param {Discourse.SiteSetting} setting The setting we've changed
    **/
    save: function(setting) {
      setting.save();
    },

    /**
      Cancel changes to a site setting

      @method cancel
      @param {Discourse.SiteSetting} setting The setting we've changed but want to revert
    **/
    cancel: function(setting) {
      setting.resetValue();
    }
  }

});
