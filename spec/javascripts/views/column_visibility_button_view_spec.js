var ColumnVisibilityButtonView = require('views/column_visibility_button_view');

describe("ColumnVisibilityButtonView", function() {

  beforeEach(function() {
    this.columnView = {
      name: sinon.stub().returns('Dummy'),
      hidden: sinon.stub().returns(false),
      on: sinon.stub()
    };
    ColumnVisibilityButtonView.prototype.template = sinon.stub();
    this.view = new ColumnVisibilityButtonView({columnView: this.columnView});
  });

  it("should have <a> as the tagName",function() {
    expect(this.view.el.nodeName).toEqual('A');
  });

  it("should set its content from the ColumnView title", function() {
    expect(this.view.render().$el.html()).toEqual(this.columnView.name());
  });

  it("should set its class from the ColumnView id", function() {
    expect(this.view.render().$el.attr('class')).toEqual('sidebar-link hide_' + this.columnView.id);
  });

  describe('toggle', function() {

    beforeEach(function() {
      this.columnView.toggle = sinon.stub();
    });

    it('delegates to the columnView', function() {
      this.view.toggle();
      expect(this.columnView.toggle).toHaveBeenCalled();
    });

  });

  describe('setClassName', function() {
    it("sets the pressed class when the column is hidden", function() {
      this.columnView.hidden = sinon.stub().returns(true);
      this.view.setClassName();
      expect(this.view.$el).toHaveClass('pressed');
    });

    it("removes the pressed class when the column is visible", function() {
      this.columnView.hidden = sinon.stub().returns(false);
      this.view.setClassName();
      expect(this.view.$el).not.toHaveClass('pressed');
    });

    it("is bound to the columnView visibilityChanged event", function() {
      expect(this.columnView.on).toHaveBeenCalledWith(
        'visibilityChanged', this.view.setClassName
      );
    });
  });
});
