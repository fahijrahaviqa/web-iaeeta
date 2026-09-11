export default function PageHeader({ title, breadcrumb, children }) {
  const renderBreadcrumb = () => {
    if (typeof breadcrumb === "string") {
      return <span className="text-gray-500">{breadcrumb}</span>;
    }
    if (Array.isArray(breadcrumb)) {
      return breadcrumb.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <span className="text-gray-500">{item}</span>
          {index < breadcrumb.length - 1 && <span className="text-gray-500">/</span>}
        </div>
      ));
    }
    return null;
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-6">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="flex items-center space-x-2 mt-1 text-sm">
          {renderBreadcrumb()}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}