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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add/Edit Link</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="link-url">URL</Label>
            <Input
              id="link-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div className="space-y-2">
             <Label>Target</Label>
             <RadioGroup defaultValue={target} onValueChange={setTarget} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="_blank" id="new-tab" />
                    <Label htmlFor="new-tab">Open in new tab</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="_self" id="same-tab" />
                    <Label htmlFor="same-tab">Open in same tab</Label>
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
