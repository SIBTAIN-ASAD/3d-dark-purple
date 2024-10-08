import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { SectionWrapper } from '../../hoc';
import { slideIn } from '../../utils/motion';
import { config } from '../../constants/curriculumVtae/config';
import { Header } from '../atoms/Header';
import GlobeDemo from '../canvas/World';
import { useMediaQuery } from 'react-responsive';

const INITIAL_STATE = Object.fromEntries(
  Object.keys(config.contact.form).map(input => [input, ''])
);

const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  accessToken: import.meta.env.VITE_EMAILJS_ACCESS_TOKEN,
};

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px)' });

  // @ts-ignore
  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // @ts-ignore
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          form_name: form.name,
          to_name: config.html.fullName,
          from_email: form.email,
          to_email: config.html.email,
          message: form.message,
        },
        emailjsConfig.accessToken
      )
      .then(
        () => {
          setLoading(false);
          alert('Thank you. I will get back to you as soon as possible.');
          setForm(INITIAL_STATE);
        },
        error => {
          setLoading(false);
          console.error('EmailJS Error:', error);
          alert('Something went wrong. Please try again.');
        }
      );
  };

  return (
    <div className={`flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row`}>
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="bg-transparent flex-[0.75] rounded-2xl p-8 pb-4 mb-4 border-2 border-gray-700"
      >
        <Header useMotion={false} {...config.contact} />

        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          {Object.keys(config.contact.form).map(input => {
            const { span, placeholder } =
              config.contact.form[input as keyof typeof config.contact.form];
            const Component = input === 'message' ? 'textarea' : 'input';

            return (
              <label key={input} className="flex flex-col">
                <span className="mb-4 font-medium text-white">{span}</span>
                <Component
                  type={input === 'email' ? 'email' : 'text'}
                  name={input}
                  value={form[input]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="bg-transparent border-2 border-gray-700 placeholder:text-secondary rounded-lg px-6 py-4 font-medium text-white outline-none"
                  rows={input === 'message' ? 7 : undefined}
                />
              </label>
            );
          })}
          <button
            type="submit"
            className=" border-2 border-secondary bg-black px-4 opacity-50 text-white font-medium py-4 rounded-lg hover:bg-secondary hover:text-black transition-all duration-300 ease-in-out"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      {isMediumScreen && (
        <motion.div
          variants={slideIn('right', 'tween', 0.2, 1)}
          className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
        >
          <GlobeDemo />
        </motion.div>
      )}
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
