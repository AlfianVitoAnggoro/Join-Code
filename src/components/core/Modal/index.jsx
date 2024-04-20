'use client';

export default function Modal(props) {
  const { children } = props;

  return (
    <div className="fixed inset-0 mx-auto bg-black bg-opacity-50 w-screen h-screen z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit h-fit rounded-lg">
        {children}
      </div>
    </div>
  );
}
