type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  hero: {
    name: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: "SAM — Portfolio",
    fullName: "Muhammad Sibtain Asad",
    email: "sibtainasad50@gmail.com",
  },
  hero: {
    name: "Sibtain Malik",
    p: ["Crafting innovative solutions with React, Django, and AI expertise."],
  },
  contact: {
    p: "Get in touch",
    h2: "Contact.",
    form: {
      name: {
        span: "Your Name",
        placeholder: "What's your name?",
      },
      email: { span: "Your Email", placeholder: "What's your email?" },
      message: {
        span: "Your Message",
        placeholder: "What do you want to say?",
      },
    },
  },
  sections: {
    about: {
      p: "Introduction",
      h2: "Overview.",
      content: `I'm a skilled software developer with experience in TypeScript and JavaScript, specializing in React, Django, and REST. I excel in coding, problem-solving, and software design. Additionally, I have proficiency in AI, particularly reinforcement learning using TensorFlow and PyTorch, and experience with OpenAI Gym environments for experimentation. With a background in AWS, Azure, and Google Cloud Platform, I can architect scalable AI solutions in the cloud.`,
    },
    experience: {
      p: "Accomplishments to Date",
      h2: "Professional Experience.",
    },
    feedbacks: {
      p: "Feedback from Others",
      h2: "Testimonials.",
    },
    works: {
      p: "Professional Background",
      h2: "Projects.",
      content: `I have worked on a variety of projects, including a full-stack e-commerce platform, a Django REST API, and a React-based web application. I have also developed a reinforcement learning model for an AI game player and deployed it on AWS. My work has been recognized by clients and colleagues alike for its quality and innovation.`,
    },
  },
};
