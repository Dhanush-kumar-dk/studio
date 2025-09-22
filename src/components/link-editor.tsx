"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

type LinkEditorProps = {
  onSetLink: (url: string, target: string) => void;
  onClose: () => void;
};

export default function LinkEditor({ onSetLink, onClose }: LinkEditorProps) {
  const [url, setUrl] = useState('');
  const [target, setTarget] = useState('_blank');

  const handleSave = () => {
    if (url) {
      onSetLink(url, target);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add/Edit Link</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link-url" className="text-right">
              URL
            </Label>
            <Input
              id="link-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Target</Label>
             <RadioGroup defaultValue={target} onValueChange={setTarget} className="col-span-3 flex space-x-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="_blank" id="new-tab" />
                    <Label htmlFor="new-tab">New Tab</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="_self" id="same-tab" />
                    <Label htmlFor="same-tab">Same Tab</Label>
                </div>
             </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
