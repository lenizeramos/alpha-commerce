export const getIngredientColor = (ingredient: string) => {
    const colorMap: { [key: string]: string } = {
        "Chicken": "bg-red-500",
        "Beef": "bg-red-700",
        "Pork": "bg-pink-600",
        "Tofu": "bg-yellow-500",
        "Egg": "bg-yellow-300",
        "Fish": "bg-blue-500",
        "Shrimp": "bg-orange-500",
        "Tomato": "bg-red-400",
        "Lettuce": "bg-green-500",
        "Onion": "bg-purple-500",
        "Carrot": "bg-orange-400",
        "Bell Pepper": "bg-green-600",
        "Spinach": "bg-green-700",
        "Cheddar Cheese": "bg-yellow-600",
        "Mozzarella Cheese": "bg-yellow-400",
        "Butter": "bg-orange-300",
        "Rice": "bg-gray-300",
        "Noodles": "bg-gray-400",
        "Pasta": "bg-gray-500",
        "Tortilla": "bg-yellow-500",
        "Soy Sauce": "bg-gray-700",
        "Ketchup": "bg-red-600",
        "Basil": "bg-green-800",
        "Oregano": "bg-green-700",
        "Paprika": "bg-red-500",
        "Salt": "bg-gray-600",
        "Black Pepper": "bg-black",
        "Sugar": "bg-gray-800",
        "Chocolate": "bg-brown-700",
        "Vanilla Extract": "bg-yellow-400"
    };
    
    return colorMap[ingredient] || "bg-gray-400"; 
  };