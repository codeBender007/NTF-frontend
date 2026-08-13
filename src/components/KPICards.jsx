const colorClasses = {
  blue: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    border: "border-green-100",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-500",
    border: "border-red-100",
  },
  purple: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-500",
    border: "border-orange-100",
  },
  indigo: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
  },
};

const KPICards = ({ data = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
      {data.map((item, index) => {
        const c = colorClasses[item.color] || colorClasses.blue;

        return (
          <div
            key={index}
            className={`bg-white rounded-2xl border ${c.border} shadow-sm hover:shadow-md transition-all duration-300 p-4`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-full ${c.bg} ${c.text} flex items-center justify-center`}
              >
                {item.icon}
              </div>

              <div>
                <p className="text-xs text-secondary">{item.title}</p>

                <h2 className="text-lg font-bold text-dark mt-0.5">
                  {item.value}
                </h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;
