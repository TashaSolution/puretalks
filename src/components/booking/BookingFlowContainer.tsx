"use client";

import React, { useState, useEffect } from "react";
import { Consultant } from "@/types/consultant";
import { ConsultationCategory } from "@/types/category";
import {
  BookingFormData,
  BookingConfirmation,
  ConsultationMode,
  DayAvailability,
} from "@/types/booking";
import { useLanguage } from "@/locales/i18n-context";
import { getConsultantAvailability, createBooking } from "@/lib/api/bookings";
import { BookingStepper } from "./BookingStepper";
import { ConsultationModeSelector } from "./ConsultationModeSelector";
import { DatePicker } from "./DatePicker";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { BookingSummary } from "./BookingSummary";
import { ConfirmationCard } from "./ConfirmationCard";
import { Card } from "@/ui/Card";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Badge } from "@/ui/Badge";
import {
  User,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  UserX,
} from "lucide-react";

interface Props {
  consultants: Consultant[];
  categories: ConsultationCategory[];
  preselectedConsultantSlug?: string;
  preselectedCategorySlug?: string;
  preselectedDuration?: 30 | 45 | 60;
}

export function BookingFlowContainer({
  consultants,
  categories,
  preselectedConsultantSlug,
  preselectedCategorySlug,
  preselectedDuration = 45,
}: Props) {
  const { t } = useLanguage();

  const initialConsultant =
    consultants.find((c) => c.slug === preselectedConsultantSlug) || consultants[0];
  const initialCategory =
    categories.find((cat) => cat.slug === preselectedCategorySlug) ||
    categories.find((cat) => initialConsultant.categoryIds.includes(cat.id)) ||
    categories[0];

  const [step, setStep] = useState(1);
  const [selectedConsultant, setSelectedConsultant] = useState<Consultant>(initialConsultant);
  const [selectedCategory, setSelectedCategory] = useState<ConsultationCategory>(initialCategory);
  const [duration, setDuration] = useState<30 | 45 | 60>(preselectedDuration);
  const [mode, setMode] = useState<ConsultationMode>("audio");

  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [concernNotes, setConcernNotes] = useState("");
  const [isAgreed, setIsAgreed] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  useEffect(() => {
    async function loadAvailability() {
      const days = await getConsultantAvailability(selectedConsultant.id);
      setAvailability(days);
      if (days.length > 0) {
        setSelectedDate(days[0].date);
        const firstAvailableSlot = days[0].slots.find((s) => s.available);
        if (firstAvailableSlot) {
          setSelectedTimeSlot(firstAvailableSlot.time);
        }
      }
    }
    loadAvailability();
  }, [selectedConsultant]);

  const currentDaySlots =
    availability.find((d) => d.date === selectedDate)?.slots || [];

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload: BookingFormData = {
        consultantId: selectedConsultant.id,
        categoryId: selectedCategory.id,
        consultationMode: mode,
        durationMinutes: duration,
        selectedDate,
        selectedTimeSlot,
        clientName: isAnonymous ? "Anonymous Sanctuary Member" : clientName || "Guest Client",
        clientEmail: clientEmail || "confidential@puretalks.in",
        clientPhone: clientPhone || "+91 90000 00000",
        isAnonymous,
        concernNotes,
        isAgreedToTerms: isAgreed,
      };

      const result = await createBooking(payload);
      setConfirmation(result);
      setStep(6);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while confirming booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    "Expert",
    "Mode",
    "Date & Time",
    "Details",
    "Review",
    "Confirmed",
  ];

  if (confirmation) {
    return <ConfirmationCard confirmation={confirmation} />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Stepper Header */}
      <BookingStepper currentStep={step} steps={stepsList} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Flow Form */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 1: Select Consultant & Domain */}
          {step === 1 && (
            <Card glass className="p-7 sm:p-9 border-black/[0.08] bg-white shadow-card rounded-2xl space-y-6">
              <div>
                <Badge variant="sage" size="sm" className="mb-2 font-semibold">
                  Step 1 of 5
                </Badge>
                <h3 className="text-2xl font-serif font-bold text-[#1C2024] tracking-tight">
                  Select Domain & Expert
                </h3>
                <p className="text-xs text-[#6B7280] mt-1 font-normal">
                  Choose the specialist best aligned with your personal or emotional needs.
                </p>
              </div>

              {/* Consultant Dropdown / Cards */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-[#1C2024]">
                  Choose Specialist
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {consultants.map((c) => {
                    const isSelected = selectedConsultant.id === c.id;
                    return (
                      <div
                        key={c.id}
                        onClick={() => setSelectedConsultant(c)}
                        className={`p-4 rounded-xl cursor-pointer transition-all border flex items-center gap-3.5 ${
                          isSelected
                            ? "bg-[#4A6B5D]/8 border-[#4A6B5D] ring-2 ring-[#4A6B5D]/20 shadow-sm"
                            : "bg-[#FAF8F5] border-black/10 hover:border-black/20"
                        }`}
                      >
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-black/10 shrink-0 bg-[#F4EFEA]">
                          <img src={c.avatar} alt={c.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-serif font-bold text-[#1C2024] truncate">
                            {c.name}
                          </p>
                          <p className="text-[11px] text-[#4A6B5D] font-semibold truncate">
                            {c.title}
                          </p>
                          <p className="text-[10px] text-[#6B7280] mt-0.5 font-medium">{c.experienceYears}+ Yrs Experience</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Duration selector */}
              <div className="space-y-2 pt-2 border-t border-black/[0.06]">
                <label className="block text-xs font-bold text-[#1C2024]">
                  Consultation Duration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {([30, 45, 60] as const).map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setDuration(dur)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                        duration === dur
                          ? "bg-[#4A6B5D] text-white border-[#3B5749] shadow-sm"
                          : "bg-[#FAF8F5] border-black/10 text-[#4B5563] hover:border-black/20"
                      }`}
                    >
                      {dur} Mins
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="font-bold shadow-md shadow-[#4A6B5D]/20"
                >
                  {t.common.continue}
                </Button>
              </div>
            </Card>
          )}

          {/* STEP 2: Consultation Mode */}
          {step === 2 && (
            <Card glass className="p-7 sm:p-9 border-black/[0.08] bg-white shadow-card rounded-2xl space-y-6">
              <div>
                <Badge variant="sage" size="sm" className="mb-2 font-semibold">
                  Step 2 of 5
                </Badge>
                <h3 className="text-2xl font-serif font-bold text-[#1C2024] tracking-tight">
                  Consultation Mode
                </h3>
              </div>

              <ConsultationModeSelector
                selectedMode={mode}
                onSelectMode={setMode}
              />

              <div className="pt-4 flex items-center justify-between border-t border-black/[0.06]">
                <Button variant="ghost" size="md" onClick={handleBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  {t.common.back}
                </Button>
                <Button variant="primary" size="md" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {t.common.continue}
                </Button>
              </div>
            </Card>
          )}

          {/* STEP 3: Date & Time Selection */}
          {step === 3 && (
            <Card glass className="p-7 sm:p-9 border-black/[0.08] bg-white shadow-card rounded-2xl space-y-6">
              <div>
                <Badge variant="sage" size="sm" className="mb-2 font-semibold">
                  Step 3 of 5
                </Badge>
                <h3 className="text-2xl font-serif font-bold text-[#1C2024] tracking-tight">
                  Choose Date & Time Slot
                </h3>
              </div>

              <DatePicker
                days={availability}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />

              <TimeSlotSelector
                slots={currentDaySlots}
                selectedSlot={selectedTimeSlot}
                onSelectSlot={setSelectedTimeSlot}
              />

              <div className="pt-4 flex items-center justify-between border-t border-black/[0.06]">
                <Button variant="ghost" size="md" onClick={handleBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  {t.common.back}
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  disabled={!selectedTimeSlot}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {t.common.continue}
                </Button>
              </div>
            </Card>
          )}

          {/* STEP 4: Client Details & Anonymous Option */}
          {step === 4 && (
            <Card glass className="p-7 sm:p-9 border-black/[0.08] bg-white shadow-card rounded-2xl space-y-6">
              <div>
                <Badge variant="sage" size="sm" className="mb-2 font-semibold">
                  Step 4 of 5
                </Badge>
                <h3 className="text-2xl font-serif font-bold text-[#1C2024] tracking-tight">
                  Contact & Confidentiality Preferences
                </h3>
              </div>

              {/* Anonymous Mode Toggle */}
              <div className="p-5 rounded-2xl bg-[#4A6B5D]/8 border border-[#4A6B5D]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4A6B5D]/15 text-[#4A6B5D] flex items-center justify-center">
                    <UserX className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C2024]">
                      Anonymous Consultation Mode
                    </h4>
                    <p className="text-[11px] text-[#6B7280]">
                      Hide your real identity. Use a pseudonym.
                    </p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  id="anon-toggle"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 accent-[#4A6B5D] rounded cursor-pointer"
                />
              </div>

              <div className="space-y-4">
                <Input
                  label={isAnonymous ? "Alias / Pseudonym Name" : "Full Name"}
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder={isAnonymous ? "e.g. HopeSeeker99" : "e.g. David Wilson"}
                  leftIcon={<User className="w-4 h-4" />}
                  required
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Email Address (For encrypted room link)"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="youremail@example.com"
                    leftIcon={<Mail className="w-4 h-4" />}
                    required
                  />

                  <Input
                    label="WhatsApp / Phone Number"
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+91 98400 12345"
                    leftIcon={<Phone className="w-4 h-4" />}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1C2024]">
                    Brief Context / Topics to discuss (Optional & Confidential)
                  </label>
                  <textarea
                    rows={3}
                    value={concernNotes}
                    onChange={(e) => setConcernNotes(e.target.value)}
                    placeholder="Feel free to briefly mention what you want clarity on..."
                    className="w-full bg-[#FAF8F5] border border-black/10 rounded-xl p-3 text-xs text-[#1C2024] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#4A6B5D] focus:ring-1 focus:ring-[#4A6B5D]/30"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-black/[0.06]">
                <Button variant="ghost" size="md" onClick={handleBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  {t.common.back}
                </Button>
                <Button variant="primary" size="md" onClick={handleNext} rightIcon={<ArrowRight className="w-4 h-4" />}>
                  {t.common.continue}
                </Button>
              </div>
            </Card>
          )}

          {/* STEP 5: Final Review & Confirmation */}
          {step === 5 && (
            <Card glass className="p-7 sm:p-9 border-black/[0.08] bg-white shadow-card rounded-2xl space-y-6">
              <div>
                <Badge variant="gold" size="sm" className="mb-2 font-semibold">
                  Step 5 of 5
                </Badge>
                <h3 className="text-2xl font-serif font-bold text-[#1C2024] tracking-tight">
                  Final Review & Instant Reservation
                </h3>
                <p className="text-xs text-[#6B7280] mt-1 font-normal">
                  Please review your selected time, mode, and consultant before reserving your sanctuary.
                </p>
              </div>

              {/* Ethics and Guarantee agreement */}
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-black/[0.06] space-y-2 text-xs text-[#4B5563]">
                <div className="flex items-center gap-2 text-[#4A6B5D] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confidentiality & Cancellation Agreement</span>
                </div>
                <p className="leading-relaxed font-normal">
                  By confirming, you agree to PureTalks Code of Ethics. Your session link will be generated instantly and no recordings will ever be made.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-black/[0.06]">
                <Button variant="ghost" size="md" onClick={handleBack} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  {t.common.back}
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  onClick={handleFinalSubmit}
                  className="shadow-md shadow-[#4A6B5D]/25 font-bold px-8"
                  rightIcon={<Sparkles className="w-4 h-4" />}
                >
                  {t.common.confirmBooking}
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Right Sticky Summary Box */}
        <div className="lg:col-span-4 sticky top-24">
          <BookingSummary
            consultant={selectedConsultant}
            category={selectedCategory}
            duration={duration}
            mode={mode}
            date={selectedDate}
            timeSlot={selectedTimeSlot}
            clientName={clientName}
            isAnonymous={isAnonymous}
          />
        </div>
      </div>
    </div>
  );
}
