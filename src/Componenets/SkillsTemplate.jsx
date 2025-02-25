import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import AppContext from "../context/AppContext";

const PREDEFINED_SKILLS = {
  frontend: ["React", "Angular", "Vue.js", "HTML/CSS", "JavaScript"],
  backend: ["Node.js", "Python", "Java", "PHP", "Ruby"],
  fullstack: ["MERN Stack", "MEAN Stack", "Ruby on Rails", "Django"],
  devops: ["Docker", "Kubernetes", "AWS", "Jenkins", "Git"],
};

const SkillsTemplate = ({ 
  initialSkills = [], 
  isEditMode = false,
  onCancel,
  onSuccess
}) => {
  const navigate = useNavigate();
  const { handleAddSkills } = useContext(AppContext);
  const [showCustomSkill, setShowCustomSkill] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customCategory, setCustomCategory] = useState("frontend");

  const {
    control,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: {
      skills: initialSkills.map(skill => ({
        title: skill.title,
        category: skill.category || 'frontend'
      }))
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills"
  });

  const handleSkillSelect = (title, category) => {
    const exists = fields.some(field => 
      field.title === title && field.category === category
    );
    if (!exists) {
      append({ title, category });
    }
  };

  const handleSkillRemove = (title, category) => {
    const index = fields.findIndex(f => f.title === title && f.category === category);
    if (index !== -1) remove(index);
  };

  const handleCustomSkillAdd = () => {
    if (customTitle.trim()) {
      handleSkillSelect(customTitle.trim(), customCategory);
      setCustomTitle("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await handleAddSkills({ skills: fields });
      if (response?.success) {
        if (isEditMode && onSuccess) {
          onSuccess();
        } else {
          navigate("/home/dashboard");
        }
      }
    } catch (error) {
      console.error('Error updating skills:', error);
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center mb-6">
          {isEditMode ? 'Edit Skills' : 'Add Your Skills'}
        </h2>

        {/* Predefined Skills Sections */}
        {Object.entries(PREDEFINED_SKILLS).map(([category, skills]) => (
          <div key={category} className="border-b border-gray-700 pb-4">
            <h3 className="text-xl font-semibold capitalize mb-3">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => {
                const isSelected = fields.some(field => 
                  field.title === skill && field.category === category
                );
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => isSelected 
                      ? handleSkillRemove(skill, category)
                      : handleSkillSelect(skill, category)
                    }
                    className={`px-3 py-1 rounded-full text-sm transition-colors duration-200
                      ${isSelected 
                        ? 'bg-indigo-600 hover:bg-indigo-700' 
                        : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                  >
                    {skill}
                    {isSelected && ' ✓'}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Custom Skill Input */}
        <div className="border-t border-gray-700 pt-4">
          <button
            type="button"
            onClick={() => setShowCustomSkill(!showCustomSkill)}
            className="text-indigo-400 hover:text-indigo-300"
          >
            + Add Custom Skill
          </button>
          
          {showCustomSkill && (
            <div className="mt-3 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Skill Title"
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleCustomSkillAdd();
                    }
                  }}
                />
                <select
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2"
                >
                  {Object.keys(PREDEFINED_SKILLS).map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleCustomSkillAdd}
                disabled={!customTitle.trim()}
                className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 
                  disabled:bg-gray-600 disabled:cursor-not-allowed
                  text-white rounded-md transition-colors duration-200"
              >
                Add Custom Skill
              </button>
            </div>
          )}
        </div>

        {/* Selected Skills List */}
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-xl font-semibold mb-3">Selected Skills</h3>
          <div className="flex flex-wrap gap-2">
            {fields.map((field, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-indigo-600 px-3 py-1 rounded-full"
              >
                <span className="text-sm">{field.title}</span>
                <button
                  type="button"
                  onClick={() => handleSkillRemove(field.title, field.category)}
                  className="text-white hover:text-red-300"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || fields.length === 0}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200"
          >
            {isSubmitting ? "Saving..." : isEditMode ? "Update Skills" : "Save Skills"}
          </button>
          <button
            onClick={onCancel || (() => navigate("/home/dashboard"))}
            type="button"
            disabled={isSubmitting}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200"
          >
            {isEditMode ? "Cancel" : "Skip"}
          </button>
        </div>
      </form>
    </div>
  );
};

export { PREDEFINED_SKILLS };
export default SkillsTemplate; 