import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import './FAQ.css';

export default function FAQ({ onOpenLeadModal, activeCity = 'Prayagraj' }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: `Which courses are available at Dhyeya IAS ${activeCity}?`,
      answer: `We offer full-cycle offline classroom and hybrid courses: 2-Year Foundation (for college students/undergraduates), 1-Year Comprehensive GS Pre-cum-Mains Batch for UPSC & UPPSC, Optional Subject batches (History, Geography, PSIR, Hindi Literature, Public Administration), and dedicated Prelims/Mains Test Series.`,
    },
    {
      question: 'What is the duration of the courses?',
      answer: `Our GS Foundation course spans 10 to 12 months with daily 3-hour classes, followed by dedicated test series and revision capsules. The 2-Year Undergraduate Foundation runs across 20-22 months with step-by-step NCERT and answer writing modules.`,
    },
    {
      question: 'Do you provide test series and answer writing practice?',
      answer: `Yes, regular testing is the backbone of Dhyeya IAS. Every student participates in weekly topic tests, monthly full-length mock examinations, and our celebrated Daily Answer Writing Programme with detailed faculty review and line-by-line feedback.`,
    },
    {
      question: 'How can I book a counselling session?',
      answer: `You can click any "Book Free Counselling" button on this page, fill out the quick 1-minute roadmap form, or visit our centre in ${activeCity} directly. Our senior academic counsellors provide free profile evaluation and customized syllabus planning.`,
    },
    {
      question: 'Are both Hindi and English medium batches available?',
      answer: `Yes, Dhyeya IAS provides separate, dedicated batches for both Hindi Medium and English Medium aspirants, taught by expert bilingual faculty with dedicated study material for each medium.`,
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section" id="faqs">
      <div className="container">
        <div className="faq-header-row">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <button
            type="button"
            className="btn-view-all-faqs"
            onClick={() => onOpenLeadModal('FAQ Help Desk')}
          >
            <span>View All FAQs</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={18} className="faq-chevron" />
                </button>
                {isOpen && (
                  <div className="faq-answer-panel">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
