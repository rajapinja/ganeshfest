import { useParams } from "react-router-dom";
import CategoryContainer from "./CategoryContainer";

function CategoryRoute() {
  const { category, subCategory } = useParams();
  return <CategoryContainer category={category} subCategory={subCategory} />;
}

export default CategoryRoute;

//Now the flow works like this:
// /category/idols → calls API with ?category=idols → shows all idols.
// /category/idols/clay → calls API with ?category=idols&subCategory=clay → shows only clay idols.
// /category/food/tiffins → shows only tiffins.