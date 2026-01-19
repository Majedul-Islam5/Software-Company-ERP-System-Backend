import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionText() {
  return (
    <section className="py-16 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible>
        <AccordionItem value="q1">
          <AccordionTrigger>
            How do I set up a new company in the ERP system?
          </AccordionTrigger>
          <AccordionContent>
            You can add a new company from the Admin Panel → Companies → Add New.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
