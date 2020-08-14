import React from "react";
import PropTypes from "prop-types";
import { editingStoryPropTypesShape } from "../../../models/beta/story";
import ExpandedStorySection from "./ExpandedStorySection";

const ExpandedStoryAcceptedBy = ({ users, story }) => {
  const user = users.find((u) => u.id === story._editing.acceptedById);

  return user && story._editing.acceptedById ? (
    <ExpandedStorySection
      title={I18n.t("activerecord.attributes.story.accepted_by")}
    >
      {user.name}
    </ExpandedStorySection>
  ) : null;
};

ExpandedStoryAcceptedBy.propTypes = {
  users: PropTypes.array.isRequired,
  story: editingStoryPropTypesShape.isRequired,
};

export default ExpandedStoryAcceptedBy;