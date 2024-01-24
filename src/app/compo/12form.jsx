"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const subjects = ['Physics', 'Chemistry', 'Biology','Maths']; 
const topicsBySubject = {
  Physics: ["Electrostatics",
  "Current Electricity",
  "Magnetic Effects of Current and Magnetism",
  "Electromagnetic Induction and Alternating Currents",
  "Electromagnetic Waves",
  "Optics",
  "Dual Nature of Radiation and Matter",
  "Atoms and Nuclei",
  "Electronic Devices"],
  Chemistry: ['Solid State',
    'Solutions',
    'Electrochemistry',
    'Chemical Kinetics',
   ' Surface Chemistry',
    'General Principles and Processes of Isolation of Elements',
'    The p-Block Elements' ,  ' The d- and f-Block Elements',
   ' Coordination Compounds',
   ' Haloalkanes and Haloarenes',
    'Alcohols, Phenols, and Ethers',
    'Aldehydes, Ketones, and Carboxylic Acids',
    'Amines',
    'Biomolecules',
   ' Polymers',
   ' Chemistry in Everyday Life'],
  Biology: ["Reproduction in Organisms",
  "Sexual Reproduction in Flowering Plants",
  "Human Reproduction",
  "Reproductive Health",
  "Principles of Inheritance and Variation",
  "Molecular Basis of Inheritance",
  "Evolution",
  "Human Health and Disease",
  "Strategies for Enhancement in Food Production",
  "Microbes in Human Welfare",
  "Biotechnology: Principles and Processes",
  "Biotechnology and its Applications",
  "Organisms and Populations",
  "Ecosystem",
  "Biodiversity and Conservation",
  "Environmental Issues"],
  Maths:[ "Relations and Functions",
  "Inverse Trigonometric Functions",
  "Matrices",
  "Determinants",
  "Continuity and Differentiability",
  "Application of Derivatives",
  "Integrals",
  "Application of Integrals",
  "Differential Equations",
  "Vector Algebra",
  "Three Dimensional Geometry",
  "Linear Programming",
  "Probability"]
};


const Post12Form = () => {
  
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      correctOption: '',
      solution: '',
      imageURL: '',
    },
  ]);

  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setSelectedSubject(selectedSubject);
    setSelectedTopic(''); // Reset selected topic when subject changes
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        question: '',
        options: ['', '', '', ''],
        correctOption: '',
        solution: '',
        imageURL: '',
      },
    ]);
  };

  const addOption = (questionIndex) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[questionIndex].options.push('');
      return newQuestions;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/post12', {
        method: 'POST',
        body: JSON.stringify({
          subject: selectedSubject,
          topic: selectedTopic,
          questions,
        }),
      });
      const data = await res.json();
      alert('Questions Posted!!');

      router.push('/'); 
    } catch (error) {
      alert('Something Went Wrong');
    }
  };

  return (
  
    <div className="sm:w-full lg:w-full p-3">
  <div className="bg-gray-300 rounded-lg shadow-md p-14">
    <h1 className="text-3xl font-medium text-black mb-6 mt-4">Create Questions For 12th</h1>
    <form className="space-y-4" onSubmit={handleSubmit}>

      <div className="sm:grid sm:grid-cols-2 sm:gap-4">
        <div>
          <label htmlFor="subject" className="block text-sm font-bold text-black">
            Subject
          </label>
          <select
            name="subject"
            value={selectedSubject}
            onChange={handleSubjectChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none text-black focus:border-blue-500"
          >
            <option value="" disabled>Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {selectedSubject && (
          <div>
            <label htmlFor="topic" className="block text-sm font-bold text-black">
              Topic
            </label>
            <select
              name="topic"
              value={selectedTopic}
              onChange={handleTopicChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none text-black focus:border-blue-500"
            >
              <option value="" disabled>Select Topic</option>
              {topicsBySubject[selectedSubject].map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="border p-4 rounded-md mb-4">
          <div className="sm:grid sm:grid-cols-2 sm:gap-4">
            <div>
              <label htmlFor={`question-${questionIndex}`} className="block text-sm font-bold text-black">
                Question
              </label>
              <input
                type="text"
                id={`question-${questionIndex}`}
                value={question.question}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[questionIndex].question = e.target.value;
                  setQuestions(newQuestions);
                }}
                placeholder="Enter the question"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-black">
                Options
              </label>
              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[questionIndex].options[optionIndex] = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  placeholder={`Option ${optionIndex + 1}`}
                  className="w-full px-3 py-2 border rounded-md mb-2 focus:outline-none focus:border-blue-500"
                />
              ))}
              <button
                type="button"
                onClick={() => addOption(questionIndex)}
                className="text-blue-500 hover:text-blue-600 cursor-pointer focus:outline-none"
              >
                + Add Option
              </button>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-2 sm:gap-4">
          <div>
  <label htmlFor={`correctOption-${questionIndex}`} className="block text-sm font-bold text-black">
    Correct Option
  </label>
  <select
    id={`correctOption-${questionIndex}`}
    value={question.correctOption}
    onChange={(e) => {
      const newQuestions = [...questions];
      newQuestions[questionIndex].correctOption = e.target.value;
      setQuestions(newQuestions);
    }}
    className="w-full px-3 py-2 border rounded-md focus:outline-none text-black focus:border-blue-500"
  >
    <option value="" disabled className="text-black">Select Correct Option</option>
    {question.options.map((option, optionIndex) => (
      <option key={optionIndex} value={option} className="text-black">
        {option}
      </option>
    ))}
  </select>
</div>


            <div>
              <label htmlFor={`solution-${questionIndex}`} className="block text-sm font-bold text-black">
                Solution
              </label>
              <textarea
                id={`solution-${questionIndex}`}
                rows="4"
                value={question.solution}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[questionIndex].solution = e.target.value;
                  setQuestions(newQuestions);
                }}
                className="w-full p-2.5 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Write the solution here..."
              ></textarea>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-2 sm:gap-4">
            <div>
              <label htmlFor={`imageURL-${questionIndex}`} className="block text-sm font-bold text-black">
                Image URL (Optional)
              </label>
              <input
                type="text"
                id={`imageURL-${questionIndex}`}
                value={question.imageURL}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[questionIndex].imageURL = e.target.value;
                  setQuestions(newQuestions);
                }}
                placeholder="Enter the image URL (optional)"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}

      <div>
        <button
          type="button"
          onClick={addQuestion}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg text-sm focus:outline-none"
        >
          + Add Another Question
        </button>
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg text-sm focus:outline-none"
        >
          Post Your Questions
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default Post12Form;