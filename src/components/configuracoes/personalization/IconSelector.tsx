
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  Package, Search, User, Building, Car, FileText, Shield, TrendingUp, 
  Camera, Phone, Mail, MapPin, Heart, Star, Calendar, Clock, 
  Settings, Database, Cloud, Lock, Key, Eye, Download, Upload,
  BarChart, PieChart, LineChart, Edit, Trash, Plus, Check, X,
  Home, Globe, Zap, Target, Award, Gift, Flag, Bell, MessageCircle,
  Activity, Briefcase, Calculator, CreditCard, DollarSign, Fingerprint,
  Folder, HardDrive, Headphones, Image, Laptop, Layers, Link, Map,
  Percent, Printer, Smartphone, Wrench, Truck, Wallet, Wifi, Users,
  History, AlertCircle,
  // 30 novos ícones adicionados
  Anchor, Archive, ArrowUpRight, Atom, BadgeCheck, Banknote, Battery, 
  Bluetooth, Bookmark, Box, Brain, Bug, Cake, CircleDollarSign, Clipboard,
  Code, Compass, Cpu, Crown, Diamond, Disc, Drama, Dribbble, Drum,
  Eraser, Facebook, Feather, Film, Filter, Flame, FlaskConical, Gamepad2,
  Gauge, Gem, Github, Glasses, GraduationCap, Hammer, Hash, Hexagon,
  Instagram, Joystick, Keyboard, Landmark, LayoutGrid, Lightbulb, 
  Linkedin, Magnet, Megaphone, Microscope, Monitor, Moon, Mountain,
  Music, Network, Newspaper, Paintbrush, Palette, Paperclip, PenTool,
  Pizza, Plane, Plug, Podcast, Puzzle, QrCode, Radio, Rocket,
  Ruler, Scale, Scissors, Server, Share2, ShieldCheck, ShoppingBag,
  ShoppingCart, Signpost, Slack, Smile, Sparkles, Speaker, Stethoscope,
  Sun, Sword, Tag, Telescope, Terminal, ThumbsUp, Timer, ToggleLeft,
  Trophy, Tv, Umbrella, Video, Voicemail, Volume2, Watch, Wind, Youtube
} from 'lucide-react';

interface IconSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const IconSelector = ({ value, onChange, label = "Ícone" }: IconSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const availableIcons = [
    { name: 'Package', component: Package },
    { name: 'Search', component: Search },
    { name: 'User', component: User },
    { name: 'Building', component: Building },
    { name: 'Car', component: Car },
    { name: 'FileText', component: FileText },
    { name: 'Shield', component: Shield },
    { name: 'TrendingUp', component: TrendingUp },
    { name: 'Camera', component: Camera },
    { name: 'Phone', component: Phone },
    { name: 'Mail', component: Mail },
    { name: 'MapPin', component: MapPin },
    { name: 'Heart', component: Heart },
    { name: 'Star', component: Star },
    { name: 'Calendar', component: Calendar },
    { name: 'Clock', component: Clock },
    { name: 'Settings', component: Settings },
    { name: 'Database', component: Database },
    { name: 'Cloud', component: Cloud },
    { name: 'Lock', component: Lock },
    { name: 'Key', component: Key },
    { name: 'Eye', component: Eye },
    { name: 'Download', component: Download },
    { name: 'Upload', component: Upload },
    { name: 'BarChart', component: BarChart },
    { name: 'PieChart', component: PieChart },
    { name: 'LineChart', component: LineChart },
    { name: 'Edit', component: Edit },
    { name: 'Trash', component: Trash },
    { name: 'Plus', component: Plus },
    { name: 'Check', component: Check },
    { name: 'X', component: X },
    { name: 'Home', component: Home },
    { name: 'Globe', component: Globe },
    { name: 'Zap', component: Zap },
    { name: 'Target', component: Target },
    { name: 'Award', component: Award },
    { name: 'Gift', component: Gift },
    { name: 'Flag', component: Flag },
    { name: 'Bell', component: Bell },
    { name: 'MessageCircle', component: MessageCircle },
    { name: 'Activity', component: Activity },
    { name: 'Briefcase', component: Briefcase },
    { name: 'Calculator', component: Calculator },
    { name: 'CreditCard', component: CreditCard },
    { name: 'DollarSign', component: DollarSign },
    { name: 'Fingerprint', component: Fingerprint },
    { name: 'Folder', component: Folder },
    { name: 'HardDrive', component: HardDrive },
    { name: 'Headphones', component: Headphones },
    { name: 'Image', component: Image },
    { name: 'Laptop', component: Laptop },
    { name: 'Layers', component: Layers },
    { name: 'Link', component: Link },
    { name: 'Map', component: Map },
    { name: 'Percent', component: Percent },
    { name: 'Printer', component: Printer },
    { name: 'Smartphone', component: Smartphone },
    { name: 'Wrench', component: Wrench },
    { name: 'Truck', component: Truck },
    { name: 'Wallet', component: Wallet },
    { name: 'Wifi', component: Wifi },
    { name: 'Users', component: Users },
    { name: 'History', component: History },
    { name: 'AlertCircle', component: AlertCircle },
    // 30+ novos ícones
    { name: 'Anchor', component: Anchor },
    { name: 'Archive', component: Archive },
    { name: 'ArrowUpRight', component: ArrowUpRight },
    { name: 'Atom', component: Atom },
    { name: 'BadgeCheck', component: BadgeCheck },
    { name: 'Banknote', component: Banknote },
    { name: 'Battery', component: Battery },
    { name: 'Bluetooth', component: Bluetooth },
    { name: 'Bookmark', component: Bookmark },
    { name: 'Box', component: Box },
    { name: 'Brain', component: Brain },
    { name: 'Bug', component: Bug },
    { name: 'Cake', component: Cake },
    { name: 'CircleDollarSign', component: CircleDollarSign },
    { name: 'Clipboard', component: Clipboard },
    { name: 'Code', component: Code },
    { name: 'Compass', component: Compass },
    { name: 'Cpu', component: Cpu },
    { name: 'Crown', component: Crown },
    { name: 'Diamond', component: Diamond },
    { name: 'Disc', component: Disc },
    { name: 'Drama', component: Drama },
    { name: 'Dribbble', component: Dribbble },
    { name: 'Drum', component: Drum },
    { name: 'Eraser', component: Eraser },
    { name: 'Facebook', component: Facebook },
    { name: 'Feather', component: Feather },
    { name: 'Film', component: Film },
    { name: 'Filter', component: Filter },
    { name: 'Flame', component: Flame },
    { name: 'FlaskConical', component: FlaskConical },
    { name: 'Gamepad2', component: Gamepad2 },
    { name: 'Gauge', component: Gauge },
    { name: 'Gem', component: Gem },
    { name: 'Github', component: Github },
    { name: 'Glasses', component: Glasses },
    { name: 'GraduationCap', component: GraduationCap },
    { name: 'Hammer', component: Hammer },
    { name: 'Hash', component: Hash },
    { name: 'Hexagon', component: Hexagon },
    { name: 'Instagram', component: Instagram },
    { name: 'Joystick', component: Joystick },
    { name: 'Keyboard', component: Keyboard },
    { name: 'Landmark', component: Landmark },
    { name: 'LayoutGrid', component: LayoutGrid },
    { name: 'Lightbulb', component: Lightbulb },
    { name: 'Linkedin', component: Linkedin },
    { name: 'Magnet', component: Magnet },
    { name: 'Megaphone', component: Megaphone },
    { name: 'Microscope', component: Microscope },
    { name: 'Monitor', component: Monitor },
    { name: 'Moon', component: Moon },
    { name: 'Mountain', component: Mountain },
    { name: 'Music', component: Music },
    { name: 'Network', component: Network },
    { name: 'Newspaper', component: Newspaper },
    { name: 'Paintbrush', component: Paintbrush },
    { name: 'Palette', component: Palette },
    { name: 'Paperclip', component: Paperclip },
    { name: 'PenTool', component: PenTool },
    { name: 'Pizza', component: Pizza },
    { name: 'Plane', component: Plane },
    { name: 'Plug', component: Plug },
    { name: 'Podcast', component: Podcast },
    { name: 'Puzzle', component: Puzzle },
    { name: 'QrCode', component: QrCode },
    { name: 'Radio', component: Radio },
    { name: 'Rocket', component: Rocket },
    { name: 'Ruler', component: Ruler },
    { name: 'Scale', component: Scale },
    { name: 'Scissors', component: Scissors },
    { name: 'Server', component: Server },
    { name: 'Share2', component: Share2 },
    { name: 'ShieldCheck', component: ShieldCheck },
    { name: 'ShoppingBag', component: ShoppingBag },
    { name: 'ShoppingCart', component: ShoppingCart },
    { name: 'Signpost', component: Signpost },
    { name: 'Slack', component: Slack },
    { name: 'Smile', component: Smile },
    { name: 'Sparkles', component: Sparkles },
    { name: 'Speaker', component: Speaker },
    { name: 'Stethoscope', component: Stethoscope },
    { name: 'Sun', component: Sun },
    { name: 'Sword', component: Sword },
    { name: 'Tag', component: Tag },
    { name: 'Telescope', component: Telescope },
    { name: 'Terminal', component: Terminal },
    { name: 'ThumbsUp', component: ThumbsUp },
    { name: 'Timer', component: Timer },
    { name: 'ToggleLeft', component: ToggleLeft },
    { name: 'Trophy', component: Trophy },
    { name: 'Tv', component: Tv },
    { name: 'Umbrella', component: Umbrella },
    { name: 'Video', component: Video },
    { name: 'Voicemail', component: Voicemail },
    { name: 'Volume2', component: Volume2 },
    { name: 'Watch', component: Watch },
    { name: 'Wind', component: Wind },
    { name: 'Youtube', component: Youtube }
  ];

  const selectedIcon = availableIcons.find(icon => icon.name === value);
  const SelectedIconComponent = selectedIcon?.component || Package;

  const handleIconSelect = (iconName: string) => {
    onChange(iconName);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <Label>{label}</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-start gap-2 h-10"
            type="button"
          >
            <SelectedIconComponent className="h-4 w-4" />
            <span>{selectedIcon?.name || 'Selecionar ícone'}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 md:w-[480px] lg:w-[560px] p-4" align="start">
          <div className="space-y-3">
            <div className="text-sm font-medium">Selecione um ícone ({availableIcons.length} disponíveis)</div>
            <div className="grid grid-cols-6 md:grid-cols-10 lg:grid-cols-12 gap-2 max-h-72 md:max-h-80 overflow-y-auto p-1">
              {availableIcons.map((icon) => {
                const IconComponent = icon.component;
                const isSelected = value === icon.name;
                
                return (
                  <Button
                    key={icon.name}
                    variant={isSelected ? "default" : "ghost"}
                    size="sm"
                    className="h-10 w-10 p-0"
                    onClick={() => handleIconSelect(icon.name)}
                    type="button"
                    title={icon.name}
                  >
                    <IconComponent className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>
            {selectedIcon && (
              <div className="flex items-center gap-2 pt-2 border-t">
                <Badge variant="secondary" className="gap-1">
                  <SelectedIconComponent className="h-3 w-3" />
                  {selectedIcon.name}
                </Badge>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default IconSelector;
