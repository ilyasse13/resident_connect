import React from 'react'

const Faq = () => {
    const faqs= [
        {
            question:'How secure is my data?',
            answer: 'We take the security of your data very seriously. Our platform employs state-of-the-art encryption techniques to ensure that your information is protected at all times. Additionally, we regularly undergo security audits to identify and address any potential vulnerabilities.'
        },
        {
            question:'Can I cancel my subscription at any time?',
            answer: 'Yes, you can cancel your subscription at any time with no questions asked. Simply navigate to your account settings and follow the prompts to cancel your subscription. Please note that any unused portion of your subscription fees will not be refunded.'
        },
        {
            question:' How do I contact customer support?',
            answer: 'Our customer support team is available 24/7 to assist you with any questions or concerns you may have. You can reach us via email at support@example.com or by phone at 1-800-123-4567. We strive to provide timely and helpful support to all of our users.'
        },
        {
            question:'What payment methods do you accept?',
            answer: 'We accept all major credit cards, including Visa, Mastercard, American Express, and Discover. Additionally, we offer alternative payment methods such as PayPal and bank transfers for your convenience'
        },
        {
            question:' How often do you release updates?',
            answer: 'We are committed to continuously improving our platform and releasing updates on a regular basis. Our development team works tirelessly to address user feedback and implement new features and enhancements. Updates are typically released every few weeks, and we strive to keep our users informed of any changes through email notifications and in-app announcements'
        },
    ]
  return (
    <div className="container mx-auto py-8">
    <h1 className="text-3xl font-semibold text-center mb-6">Frequently Asked Questions</h1>
    <div className="space-y-4 mx-20 my-7">
        {faqs.map((faq,index)=>(
            <details key={index} className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50 p-4 text-gray-900"
            >
              <h2 className="font-medium">{faq.question}</h2>
        
              <svg
                className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
        
            <p className="mt-4 px-4 leading-relaxed text-gray-700">
             {faq.answer}
            </p>
          </details>
        ))}
  

  

  
</div>
</div>
  )
}

export default Faq