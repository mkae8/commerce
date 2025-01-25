/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Globe, Plane, Scale } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chip } from "@/components/utils/Chip";

const aircraftHistory = [
  {
    era: "Алтан үе",
    years: "1920-аад - 1930-аад он",
    description:
      "Дэлхийн I дайн болон II дайны хоорондох хугацаанд нисэх онгоцны технологи хурдтай хөгжсөн.",
    models: [
      {
        name: "Douglas DC-3",
        year: 1935,
        image: "/history/douglas.avif",
        facts: [
          "Арилжааны нисэхийн түүхэнд хувьсгал хийсэн онгоц",
          "21 зорчигчийг 170 миль/цаг хурдтайгаар тээвэрлэх боломжтой",
          "16,000 гаруй онгоц цэргийн болон иргэний хувилбараар үйлдвэрлэгдсэн",
        ],
        specs: {
          speed: "170 миль/цаг",
          range: "1,500 миль",
          capacity: "21-32 зорчигч",
        },
      },
      {
        name: "Boeing 247",
        year: 1933,
        image: "/history/boeing-247.jpg",
        facts: [
          "Орчин үеийн анхны зорчигч тээврийн онгоц",
          "Бүх металл бүтэцтэй",
          "Автомат жолоодлогын технологийг нэвтрүүлсэн",
        ],
        specs: {
          speed: "155 миль/цаг",
          range: "745 миль",
          capacity: "10 зорчигч",
        },
      },
    ],
  },
  {
    era: "Турбо үе",
    years: "1950-аад - 1960-аад он",
    description:
      "Реактив хөдөлгүүрийн нэвтрэлт нь арилжааны нисэхийг эрс шинэчилсэн.",
    models: [
      {
        name: "de Havilland Comet",
        year: 1952,
        image: "/history/dehavi.jpg",
        facts: [
          "Дэлхийн анхны арилжааны реактив нисэх онгоц",
          "Даралтат кабинтай дизайн нэвтрүүлсэн",
          "Онгоцны бүтцийн дизайны чухал шинэчлэлтүүдэд нөлөөлсөн",
        ],
        specs: {
          speed: "460 миль/цаг",
          range: "1,500 миль",
          capacity: "36-44 зорчигч",
        },
      },
      {
        name: "Boeing 707",
        year: 1958,
        image: "/history/Boeing707.jpg",
        facts: [
          "Орчин үеийн реактив онгоцны стандарт тогтоосон",
          "Хоёр тивийн хооронд нисэхийг хялбар болгосон",
          "Цэргийн болон иргэний зориулалтаар 1,000 гаруй онгоц үйлдвэрлэгдсэн",
        ],
        specs: {
          speed: "540 миль/цаг",
          range: "3,000 миль",
          capacity: "140-189 зорчигч",
        },
      },
    ],
  },
  {
    era: "Орчин үе",
    years: "1970-аад он - Өнөө үе",
    description:
      "Орчин үеийн арилжааны нисэх онгоцнууд өндөр технологи, үр ашигтай байдлаараа онцлог.",
    models: [
      {
        name: "Boeing 787 Dreamliner",
        year: 2011,
        image: "/history/miat787.jpg",
        facts: [
          "Бүтцийн ихэнх хэсэгт нийлмэл материал ашигласан анхны онгоц",
          "Өмнөх загваруудаас 20%-иар түлшний хэрэглээг багасгасан",
          "Зорчигчийн тав тухыг сайжруулсан дэвшилтэт шийдэлтэй",
        ],
        specs: {
          speed: "561 миль/цаг",
          range: "7,355 миль",
          capacity: "242-330 зорчигч",
        },
      },
      {
        name: "Airbus A380",
        year: 2007,
        image: "/history/a380.jpg",
        facts: [
          "Дэлхийн хамгийн том зорчигч тээврийн онгоц",
          "Давхар давхрын зохион байгуулалттай",
          "853 хүртэл зорчигч тээвэрлэх хүчин чадалтай",
        ],
        specs: {
          speed: "561 миль/цаг",
          range: "8,000 миль",
          capacity: "525-853 зорчигч",
        },
      },
    ],
  },
];

export const AircraftHistory = () => {
  const [selectedEra, setSelectedEra] = useState(aircraftHistory[0].era);

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto border-b-2">
      <Chip title="Мэдээлэл" desc="Онгоцны Хөгжил" />
      <Tabs defaultValue={aircraftHistory[0].era} className="w-full">
        <TabsList className="flex gap-4 justify-start  ">
          {aircraftHistory.map((era) => (
            <TabsTrigger
              key={era.era}
              value={era.era}
              onClick={() => setSelectedEra(era.era)}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-orange-400 border "
            >
              {era.era}
            </TabsTrigger>
          ))}
        </TabsList>

        {aircraftHistory.map((era) => (
          <TabsContent key={era.era} value={era.era}>
            <div className="grid gap-8">
              <div className="text-center">
                <Badge variant="secondary" className="mb-2">
                  {era.years}
                </Badge>
                <p className="text-muted-foreground">{era.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {era.models.map((model) => (
                  <motion.div
                    key={model.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="aspect-video relative mb-6 overflow-hidden rounded-lg">
                          <Image
                            src={model.image || "/placeholder.svg"}
                            alt={model.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <h3 className="text-2xl font-semibold">
                              {model.name}
                            </h3>
                            <Badge variant="outline">{model.year}</Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                              <Plane className="h-5 w-5 mb-2 text-primary" />
                              <span className="text-sm font-medium">
                                {model.specs.speed}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Хурд
                              </span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                              <Globe className="h-5 w-5 mb-2 text-primary" />
                              <span className="text-sm font-medium">
                                {model.specs.range}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Зай
                              </span>
                            </div>
                            <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                              <Scale className="h-5 w-5 mb-2 text-primary" />
                              <span className="text-sm font-medium">
                                {model.specs.capacity}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Багтаамж
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="font-medium">Фактууд</h4>
                            <ul className="space-y-2">
                              {model.facts.map((fact, index) => (
                                <li key={index} className="flex items-start">
                                  <ChevronRight className="h-5 w-5 mr-2 text-primary flex-shrink-0" />
                                  <span className="text-sm text-muted-foreground">
                                    {fact}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};
