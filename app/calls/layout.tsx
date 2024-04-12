interface CallsLayoutProps {
    children: React.ReactNode
  }
  
  export default async function CallsLayout({ children }: CallsLayoutProps) {
    return (
      <div className="mt-5 p-5 overflow-hidden">
        <section className="w-full flex flex-col items-center">
          <h1 className="head_text text-center my-10">
            Call Dashboard
            <span className="ml-5 orange_gradient text-center">- Rounded</span>
          </h1>
        </section>
        {children}
      </div>
    )
  }