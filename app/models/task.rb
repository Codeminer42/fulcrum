class Task < ApplicationRecord
  belongs_to :story

  validates :name, presence: true

  before_destroy { |record| raise ActiveRecord::ReadOnlyRecord if record.readonly? }

  delegate :readonly?, to: :story

  def to_csv
    [name, status]
  end

  private

  def status
    if done == true
      'completed'
    else
      'not_completed'
    end
  end
end
