import { Button } from "@/components/ui/button";
import { QrCode, Smartphone } from "lucide-react";

export function LocationSection() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Location</h2>
      <div className="flex items-center gap-4">
        <QrCode size={80} />
        <div className="flex flex-col gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Smartphone size={20} />
            Google Play
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Smartphone size={20} />
            App Store
          </Button>
        </div>
      </div>
    </div>
  );
}
