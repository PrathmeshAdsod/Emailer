import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EmailPreview from './EmailPreview';
import IconEdit from './components/icons/IconEdit.jsx';
import EmailGenerator from './EmailGenerator';
import axios from 'axios'

function EmailList({
  emails,
  selectedEmail,
  setSelectedEmail,
  composeEmail,
  draftEmail,
  setDraftEmail,
}) {
  const [showEmailList, setShowEmailList] = useState(true);
  const [showEmailGenerator, setShowEmailGenerator] = useState(false);
  const [output, setOutput] = useState('');

  const handleEmailSelect = (thread) => {
    console.log('thread', thread);
    setSelectedEmail(thread);
    if (draftEmail?.isOpen) {
      setDraftEmail((prev) => {
        return { ...prev, isOpen: false };
      });
    }
  };

  const handleComposeEmail = () => {
    composeEmail();
  };

  const handleToggleEmailGenerator = () => {
    setShowEmailList(false);
    setShowEmailGenerator(true);
  };

  const handleToggleEmailList = () => {
    setShowEmailGenerator(false);
    setShowEmailList(true);
  };

  


  return (
    <div className="email-list-view">
      <section className="title-container">
        <p className="title">Last emails</p>
  
        <button
          className="primary small"
          onClick={handleComposeEmail}
          disabled={draftEmail?.isOpen}
        >
          Compose email
        </button>
        <button
          className="primary small"
          onClick={handleToggleEmailGenerator}
        >
          Generate AI email
        </button>
        <button
          className="primary small"
          onClick={handleToggleEmailList}
        >
          Back
        </button>
      </section>
      <section className="email-list-container">
        {showEmailList && (
          /* Render EmailList component only if showEmailList is true */
          emails.length === 0 ? (
            <p>Loading emails.</p>
          ) : (
            <ul className="email-list">
              {draftEmail?.object === 'draft' && (
                <div onClick={handleComposeEmail}>
                  <EmailPreview
                    thread={draftEmail}
                    selected={draftEmail?.isOpen}
                  />
                </div>
              )}
              {emails.map((thread) => (
                <div key={thread.id} onClick={() => handleEmailSelect(thread)}>
                  <EmailPreview
                    thread={thread}
                    selected={selectedEmail?.id === thread.id}
                  />
                </div>
              ))}
            </ul>
          )
        )}
        {showEmailGenerator && (
          /* Render EmailGenerator component only if showEmailGenerator is true */
          <EmailGenerator />
        )}
      </section>
    </div>
  );
}

EmailList.propTypes = {
  emails: PropTypes.array.isRequired,
  selectedEmail: PropTypes.object,
  setSelectedEmail: PropTypes.func,
  composeEmail: PropTypes.func.isRequired,
  draftEmail: PropTypes.object,
  setDraftEmail: PropTypes.func.isRequired,
};

export default EmailList;
