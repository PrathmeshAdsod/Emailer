import React, { useState } from 'react';
import './styles/generator.css';
import axios from 'axios';
import OpenAI from 'openai'

const EmailGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedEmails, setGeneratedEmails] = useState('');

  const openai = new OpenAI({
    apiKey: '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',dangerouslyAllowBrowser: true
  });

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleGenerateResponse = async () => {
    try {
      const chatCompletion = await openai.completions.create({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 4000,
      });
      //console.log("response", result.data.choices[0].text);
      setGeneratedEmails(chatCompletion.choices[0].text);
    } catch (e) {
      console.log(e);
      setGeneratedEmails("Something is going wrong, Please try again.",e);
    }
  };

  return (
    <div className="email-generator-container scrollable">
      <h2 className='email-generator-title'>Email Generator</h2>
      <div className='email-generator'>
        <div className="email-prompt">
          <textarea
            id="prompt"
            name="prompt"
            value={prompt}
            placeholder='Tell this AI about what you want to generate in email. Example- Last night I got promotion email from my boss. He recognized my acheivements and made me senior software engineer from junior level. Write a email to Thank him. My boss name is Rajesh Shrivastav. My name is Prathmesh Adsod. His email is rajesh@nylas.com '
            onChange={handleInputChange}
            rows={10} // Set the number of visible rows
            cols={70} // Set the number of visible columns
          ></textarea>
          <button onClick={handleGenerateResponse}>Generate</button>
        </div>

        <div className="generated-response">
          <h2>Your Email</h2>
          <div className="email-box">
            <pre>{generatedEmails}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailGenerator;
