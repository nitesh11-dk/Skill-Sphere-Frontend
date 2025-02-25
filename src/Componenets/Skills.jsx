import React from "react";
import SkillsTemplate from "./SkillsTemplate";

const Skills = () => {
  return (
    <div className="w-full p-6">
      <SkillsTemplate
        initialSkills={[]}
        isEditMode={false}
      />
    </div>
  );
};

export default Skills;
