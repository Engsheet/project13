function SignLayout({ children }) {
  return (
    <div className="relative left-1/2 top-1/2 flex min-h-[640px] w-3/5 min-w-[320px] max-w-md translate-x-[-50%] translate-y-[-50%] flex-col justify-between rounded-3xl bg-white p-8 sm:p-10">
      {children}
    </div>
  );
}

export default SignLayout;
