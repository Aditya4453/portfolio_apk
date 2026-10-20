import React from 'react';

const PRINCIPLES = [
  {
    num: '01',
    title: 'Understand before building',
    desc: 'Grasp the core problem deeply before writing a single line of architecture.',
  },
  {
    num: '02',
    title: 'Make ideas tangible',
    desc: 'Turn abstract concepts into working prototypes, tested code, and living software.',
  },
  {
    num: '03',
    title: 'Learn by shipping',
    desc: 'True mastery comes through continuous deployment, user feedback, and iterative refinement.',
  },
  {
    num: '04',
    title: 'Technology with purpose',
    desc: 'Build systems that solve meaningful problems with clarity, performance, and restraint.',
  },
];

export default function Principles() {
  return (
    <section className="principles">
      <div className="container principles-track">
        {PRINCIPLES.map((item) => (
          <div className="principle" key={item.num}>
            <span className="principle-num">{item.num}</span>
            <h3 className="principle-title">{item.title}</h3>
            <p className="principle-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
