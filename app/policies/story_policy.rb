class StoryPolicy < ApplicationPolicy
  def index?
    is_admin? || is_project_member?
  end

  def show?
    is_admin? || is_project_member? && current_project.stories.find_by_id(record.id)
  end

  def create?
    is_admin? || is_project_member?
  end

  def update?
    is_admin? || is_project_member?
  end

  def done?
    update?
  end

  def backlog?
    update?
  end

  def in_progress?
    update?
  end

  alias story? show?

  class Scope < Scope
    def resolve
      if is_admin?
        current_project.stories
      elsif is_project_member?
        current_project.stories
      else
        Story.none
      end
    end
  end
end
