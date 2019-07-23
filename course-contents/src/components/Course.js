import React from 'react';

const Header = props => {
  return <h1>{props.course}</h1>;
};

const Part = props => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = props => {
  return (
    <div>
      {props.parts.map(part => {
        return <Part key={part.id} part={part} />;
      })}
    </div>
  );
};

const Total = props => {
  return (
    <p>
      Number of exercises{' '}
      {props.parts.reduce(
        (accumulator, part) => accumulator + part.exercises,
        0
      )}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
