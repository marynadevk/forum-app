import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';

const WelcomeText = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Welcome to the Floral Haven! 🌸🌿</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          We are delighted to have you join our community of flower enthusiasts,
          plant lovers, and gardening experts! Whether you're a seasoned
          horticulturist or just starting your journey into the world of plants,
          this is the perfect place to connect, share, and learn.
        </p>
        <div>
          Here, you'll find a space to:
          <ul className="list-disc pl-5 mt-2">
            <li>Share your plant care tips and gardening stories 🌱</li>
            <li>
              Discover new plant varieties and beautiful flower species 🌺
            </li>
            <li>Ask questions and exchange advice with fellow members 🌼</li>
            <li>
              Explore creative ways to incorporate plants into your home or
              garden 🌻
            </li>
          </ul>
        </div>
        <p>
          Let's grow together in this vibrant, green community! We encourage
          friendly conversations, helpful tips, and inspiring plant discussions.
        </p>
        <p>Happy planting!</p>
      </CardContent>
    </Card>
  );
};

export default WelcomeText;
