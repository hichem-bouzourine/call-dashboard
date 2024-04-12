interface CallsLayoutProps {
    children: React.ReactNode
  }
  
  export default async function CallsLayout({ children }: CallsLayoutProps) {
    return (
      <div className="mt-5 p-5 w-full">
        {children}
      </div>
    )
  }