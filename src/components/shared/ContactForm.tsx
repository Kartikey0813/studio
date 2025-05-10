
"use client";

import { useState, type FormEvent } from 'react';
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  showAnimatedGraphic?: boolean;
}

export function ContactForm({ showAnimatedGraphic = false }: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(data);
    setIsSubmitting(false);
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
      variant: "default",
    });
    reset();
  };
  
  const inputVariants = {
    focus: {
      borderColor: "hsl(var(--primary))",
      boxShadow: "0 0 0 2px hsl(var(--ring))",
      transition: { duration: 0.3 }
    },
    blur: {
      borderColor: "hsl(var(--border))",
      boxShadow: "0 0 0 0px hsl(var(--ring))",
      transition: { duration: 0.3 }
    }
  };


  return (
    <div className={`grid ${showAnimatedGraphic ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-8 md:gap-12 items-center`}>
      {showAnimatedGraphic && (
        <motion.div 
          className="relative w-full h-64 md:h-full bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center overflow-hidden p-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {/* Placeholder for animated graphic */}
          <Send size={128} className="text-primary-foreground opacity-30 animate-pulse" />
           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-background/20 rounded-full animate-ping delay-1000 duration-3000"></div>
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-background/20 rounded-full animate-ping delay-500 duration-3000"></div>
          <h3 className="absolute bottom-8 left-8 text-3xl font-bold text-primary-foreground">Let's Connect!</h3>
        </motion.div>
      )}
      
      <motion.form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-6 p-6 md:p-8 bg-card rounded-xl shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <Label htmlFor="name" className="text-foreground/80">Full Name</Label>
          <motion.custom
            // @ts-ignore
            as={Input} 
            id="name" 
            {...register("name")}
            variants={inputVariants}
            whileFocus="focus"
            initial="blur"
            className="mt-1 bg-input focus:bg-background"
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="text-foreground/80">Email Address</Label>
          <motion.custom
            // @ts-ignore
            as={Input}  
            id="email" 
            type="email" 
            {...register("email")} 
            variants={inputVariants}
            whileFocus="focus"
            initial="blur"
            className="mt-1 bg-input focus:bg-background"
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="subject" className="text-foreground/80">Subject</Label>
          <motion.custom
            // @ts-ignore
            as={Input} 
            id="subject" 
            {...register("subject")} 
            variants={inputVariants}
            whileFocus="focus"
            initial="blur"
            className="mt-1 bg-input focus:bg-background"
            aria-invalid={errors.subject ? "true" : "false"}
          />
          {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
        </div>
        <div>
          <Label htmlFor="message" className="text-foreground/80">Message</Label>
          <motion.custom
            // @ts-ignore
            as={Textarea} 
            id="message" 
            {...register("message")} 
            rows={5} 
            variants={inputVariants}
            whileFocus="focus"
            initial="blur"
            className="mt-1 bg-input focus:bg-background"
            aria-invalid={errors.message ? "true" : "false"}
          />
          {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
        </div>
        <Button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full gradient-bg text-primary-foreground shadow-md hover:opacity-90 transition-opacity duration-300 py-3 text-base relative overflow-hidden group"
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Send className="mr-2 h-5 w-5 transform transition-transform duration-300 group-hover:translate-x-1" />
          )}
          {isSubmitting ? 'Sending...' : 'Send Message'}
          <motion.div 
            className="absolute inset-0 bg-primary-foreground/20"
            initial={{ width: 0 }}
            whileHover={{ width: "100%"}}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />
        </Button>
      </motion.form>
    </div>
  );
}
