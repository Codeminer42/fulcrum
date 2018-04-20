/* eslint global-require:"off" */
const ProjectVelocityOverrideView = require('./project_velocity_override_view');

module.exports = Backbone.View.extend({

  className: 'velocity',

  initialize() {
    _.bindAll(this, 'setFakeClass', 'render');
    this.override_view = new ProjectVelocityOverrideView({ model: this.model });
    this.listenTo(this.model, 'change:userVelocity', this.setFakeClass);
    this.listenTo(this.model, 'rebuilt-iterations', this.render);
  },

  events: {
    'click #velocity_value': 'editVelocityOverride',
  },

  template: require('templates/project_velocity.ejs'),

  render() {
    this.$el.html(this.template({ project: this.model }));
    this.setFakeClass(this.model);
    return this;
  },

  editVelocityOverride() {
    this.$el.append(this.override_view.render().el);
  },

  setFakeClass(model) {
    if (model.velocityIsFake()) {
      this.$el.addClass('fake');
    } else {
      this.$el.removeClass('fake');
    }
  },
});
