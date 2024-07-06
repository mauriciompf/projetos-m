type WrapOutletProps = {
  children: React.ReactNode;
};

export default function WrapOutlet({ children }: WrapOutletProps) {
  return <main className="mx-auto ml-[300px] w-[80%]">{children}</main>;
}
