import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SubCategoryDetail from "./SubCategoryDetail";

const BASE_URL = "http://localhost:9494";

export default function CategoryContainer() {
  const { category, subCategory } = useParams();
  const [categories, setCategories] = useState({});

  useEffect(() => {
    fetch(`${BASE_URL}/api/v1/meta/categories`)
      .then(res => res.json())
      .then(data => setCategories(data || {}));
  }, []);

  console.log("🔄 CategoryContainer render:", { category, subCategory });

  if (!category) return <p>Pick a category</p>;

  const subCats = categories[category?.toUpperCase()] || [];

  // CASE 1: No subCategory selected → show list
  if (!subCategory) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">{category}</h1>
        <h2 className="text-lg font-semibold mb-3">Subcategories</h2>
        <ul className="space-y-2">
          {subCats.map(sc => (
            <li key={sc}>
              <Link
                to={`/category/${category}/${sc.toLowerCase()}`}
                className="text-blue-600 hover:underline"
              >
                {sc}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // CASE 2: SubCategory selected → delegate to ProductDetail
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        {category} / {subCategory}
      </h1>
      <SubCategoryDetail 
        key={`${category}-${subCategory}`}  // 🔑 force remount when params change
        category={category} 
        subCategory={subCategory} 
      />
    </div>
  );
}
