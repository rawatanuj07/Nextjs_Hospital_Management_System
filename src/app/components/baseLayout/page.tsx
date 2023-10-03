export default function BaseLayout({children}: any) {
    return (
        <div className="layout">
        <main className="layout__main-content">{children}</main>
      </div>
    )
    }