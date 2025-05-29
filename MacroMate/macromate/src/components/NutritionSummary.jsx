import { useEffect, useState } from 'react';
import { getFoodDetails } from '../services/nutritionService';

export default function NutritionSummary({ ingredients }) {
  const [totals, setTotals] = useState({ calories: 0, carbs: 0, protein: 0, fat: 0 });

  useEffect(() => {
    async function calculate() {
      let sum = { calories: 0, carbs: 0, protein: 0, fat: 0 };

      for (const ing of ingredients) {
        const data = await getFoodDetails(ing.fdcId);
        // FDC returns a nutrients array; find macros:
        const nutMap = {};
        data.foodNutrients.forEach(n => {
          nutMap[n.nutrientName] = n.value;
        });
        // USDA reports total carbohydrates; net carbs = carbs – fiber
        const carbs = (nutMap['Carbohydrate, by difference'] || 0)
                      - (nutMap['Fiber, total dietary'] || 0);
        sum.calories += nutMap['Energy'] || 0;
        sum.carbs    += carbs;
        sum.protein  += nutMap['Protein'] || 0;
        sum.fat      += nutMap['Total lipid (fat)'] || 0;
      }

      setTotals(sum);
    }

    if (ingredients.length) calculate();
  }, [ingredients]);

  return (
    <div>
      <h3>Nutrition Summary</h3>
      <p>Calories: {Math.round(totals.calories)}</p>
      <p>Net Carbs: {totals.carbs.toFixed(1)} g</p>
      <p>Protein: {totals.protein.toFixed(1)} g</p>
      <p>Fat: {totals.fat.toFixed(1)} g</p>
    </div>
  );
}

