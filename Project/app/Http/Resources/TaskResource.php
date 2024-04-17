<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'status' => $this->status,
            'priority' => $this->priority,
            'created_at' => (new Carbon($this->created_at))->format('d/m/Y'),
            'due_date' => (new Carbon($this->due_date))->format('d/m/Y'),
            'image_path' => $this->image_path,
            'project' => new ProjectResource($this->project),
            'createdBy' => new UserResource($this->createdBy),
            'assignedUser' => $this->assignedUser ? new UserResource($this->assignedUser): null,
            'updatedBy' => new UserResource($this->updatedBy),
        ];
    }
}
