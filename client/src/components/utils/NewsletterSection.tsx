import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function NewsletterSection() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Plane models</h2>
      <p>Subscribe</p>
      <p>Get 10% off your first order</p>
      <form className="flex flex-col gap-2">
        <Input
          type="email"
          placeholder="Enter Your Email"
          className="bg-black border-white text-white"
        />
        <Button type="submit" variant="outline">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
