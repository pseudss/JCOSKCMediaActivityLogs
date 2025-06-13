export default function EmployeeLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      // Removed min-h-screen as the parent layout should manage overall screen height.
      // This div can be used for employee-section-specific styling or context if needed in the future.
      <div> 
        {children}
      </div>
    )
  }