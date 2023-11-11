function Frame(props: { children: React.ReactNode }) {
  return (
    <div className="w-[1202px] mx-auto items-center  flex flex-col gap-8 relative">
      {props.children}
    </div>
  );
}
export default Frame;
