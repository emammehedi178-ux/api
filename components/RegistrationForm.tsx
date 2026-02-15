import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User, Users, Phone, Gamepad2, CreditCard, Sparkles, Smartphone } from 'lucide-react';
import Card from './ui/Card';
import Input from './ui/Input';
import Button from './ui/Button';
import Select from './ui/Select';
import { GAME_OPTIONS, PAYMENT_METHODS } from '../constants';
import { generateTeamName } from '../services/geminiService';
import { saveRegistration, getRegistrations } from '../services/storageService';
import { RegistrationData } from '../types';

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatingName, setGeneratingName] = useState(false);
  const [existingTeams, setExistingTeams] = useState<string[]>([]);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegistrationData>({
    defaultValues: {
      gameName: 'Free Fire',
      teamName: '',
      player1: '',
      player2: '',
      player3: '',
      player4: '',
      paymentMethod: 'Bkash',
      agreedToRules: false
    }
  });

  const gameName = watch('gameName');
  const leaderName = watch('leaderName');

  // Load existing teams for validation
  useEffect(() => {
    const loadTeams = async () => {
      const data = await getRegistrations();
      if (data && data.length > 0) {
        setExistingTeams(data.map(d => d.teamName.toLowerCase()));
      }
    };
    loadTeams();
  }, []);

  // Sync leader name to Player 1
  useEffect(() => {
    setValue('player1', leaderName);
  }, [leaderName, setValue]);

  const handleGenerateName = async () => {
    setGeneratingName(true);
    const name = await generateTeamName(gameName);
    setValue('teamName', name);
    setGeneratingName(false);
  };

  const onSubmit: SubmitHandler<RegistrationData> = async (data) => {
    setIsSubmitting(true);
    const success = await saveRegistration(data);
    setIsSubmitting(false);

    if (success) {
      navigate('/success', { state: { transactionId: data.transactionId, teamName: data.teamName } });
    } else {
      alert("Registration failed. Please try again or contact support.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pb-20">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Team Section */}
        <Card isActive={true}>
          <div className="flex items-center gap-2 mb-6 text-brand-orange">
            <Gamepad2 size={24} />
            <h2 className="text-xl font-heading font-bold uppercase">Team Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Game Name"
              options={GAME_OPTIONS}
              {...register('gameName')}
            />
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Input
                  label="Team Name"
                  placeholder="e.g. Red Dragons"
                  error={errors.teamName?.message}
                  {...register('teamName', { 
                    required: 'Team Name is required',
                    validate: (value) => !existingTeams.includes(value.toLowerCase()) || "Team name already taken"
                  })}
                />
              </div>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleGenerateName} 
                disabled={generatingName}
                className="mb-[2px] px-3 py-[10px]"
                title="Generate AI Name"
              >
                {generatingName ? <span className="animate-spin">✨</span> : <Sparkles size={18} />}
              </Button>
            </div>
          </div>
        </Card>

        {/* Leader Section */}
        <Card>
          <div className="flex items-center gap-2 mb-6 text-brand-orange">
            <User size={24} />
            <h2 className="text-xl font-heading font-bold uppercase">Leader Info</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Leader Name"
              icon={<User size={16} />}
              error={errors.leaderName?.message}
              {...register('leaderName', { required: 'Leader Name is required' })}
            />
            <Input
              label="Phone Number (WhatsApp)"
              icon={<Phone size={16} />}
              placeholder="01XXXXXXXXX"
              error={errors.leaderPhone?.message}
              {...register('leaderPhone', { 
                required: 'Phone is required',
                pattern: { value: /^01\d{9}$/, message: 'Invalid BD Number' }
              })}
            />
            <Input
              label="Email (Optional)"
              type="email"
              {...register('leaderEmail')}
            />
             <Input
              label="Discord Username (Optional)"
              {...register('discordUsername')}
            />
             <Input
              label="In-game ID (Optional)"
              {...register('ingameId')}
            />
          </div>
        </Card>

        {/* Squad Section */}
        <Card>
           <div className="flex items-center gap-2 mb-6 text-brand-orange">
            <Users size={24} className="lucide lucide-users" /> 
            <h2 className="text-xl font-heading font-bold uppercase">Squad Members</h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
             <Input
               label="Player 1 (Leader)"
               value={leaderName || ''}
               disabled
               className="bg-gray-900 text-gray-500"
             />
             <Input
               label="Player 2"
               placeholder="Player 2 Name"
               error={errors.player2?.message}
               {...register('player2', { required: 'Required' })}
             />
             <Input
               label="Player 3"
               placeholder="Player 3 Name"
               error={errors.player3?.message}
               {...register('player3', { required: 'Required' })}
             />
             <Input
               label="Player 4"
               placeholder="Player 4 Name"
               error={errors.player4?.message}
               {...register('player4', { required: 'Required' })}
             />
          </div>
        </Card>

        {/* Payment Section */}
        <Card className="border-brand-orange/30 bg-brand-orange/5">
          <div className="flex items-center gap-2 mb-6 text-brand-orange">
            <CreditCard size={24} />
            <h2 className="text-xl font-heading font-bold uppercase">Payment</h2>
          </div>
          
          <div className="bg-gray-900/50 p-4 rounded-lg mb-6 flex flex-col items-center text-center">
            <p className="text-gray-400 mb-2">Send <span className="text-white font-bold">80 BDT</span> to</p>
            <p className="text-2xl font-mono font-bold text-brand-gold bg-gray-800 px-4 py-2 rounded copy-text mb-2 select-all">
              01755913070
            </p>
            <div className="flex gap-4 text-sm text-gray-500">
               <span className="flex items-center gap-1"><Smartphone size={14} /> Personal</span>
               <span className="flex items-center gap-1">Send Money</span>
            </div>
            <p className="text-xs text-brand-red mt-2">Reference: Use your Team Name</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Payment Method"
              options={PAYMENT_METHODS}
              {...register('paymentMethod')}
            />
            <Input
              label="Transaction ID (TrxID)"
              placeholder="e.g. A9B8C7D6"
              className="font-mono uppercase"
              error={errors.transactionId?.message}
              {...register('transactionId', { required: 'Transaction ID is required' })}
            />
          </div>
        </Card>

        {/* Agreement */}
        <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
            <input 
              type="checkbox" 
              id="agreement"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer peer checked:right-0 right-6 checked:border-green-400"
              {...register('agreedToRules', { required: 'You must agree to the rules' })}
            />
            <label htmlFor="agreement" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer peer-checked:bg-green-400"></label>
          </div>
          <label htmlFor="agreement" className="text-sm text-gray-300">
            I have read all the rules and I confirm that my team will abide by the tournament regulations. <span className="text-brand-red">*</span>
          </label>
        </div>
        {errors.agreedToRules && <p className="text-red-500 text-sm text-center">Please agree to the rules.</p>}

        <div className="sticky bottom-4 z-50">
          <Button 
            type="submit" 
            className="w-full text-lg shadow-xl shadow-black/50" 
            isLoading={isSubmitting}
          >
            COMPLETE REGISTRATION
          </Button>
        </div>

      </form>
    </div>
  );
};

export default RegistrationForm;