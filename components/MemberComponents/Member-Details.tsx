"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Users,
  Mail,
  Phone,
  Calendar,
  Heart,
  Upload,
  Trash2,
  Download,
  Eye,
  Clock,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Member } from "@/interface/member"

interface MemberDetailProps {
  id: string
}

export function MemberDetail({ id }: { id: string }) {
  const [member, setMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("Personal Information")

  useEffect(() => {
    async function fetchMember() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`/api/member/${id}`)
        if (!res.ok) throw new Error("Failed to fetch member data")
        const found: Member = await res.json()
        
        // Only display active members
        if (!found.active) {
          throw new Error("This member is inactive and cannot be displayed")
        }
        
        setMember(found)
      } catch (err: any) {
        setError(err.message || "Unknown error")
      } finally {
        setLoading(false)
      }
    }
    fetchMember()
  }, [id])

  if (loading) return <div>Loading member...</div>
  if (error) return <div>Error: {error}</div>
  if (!member) return <div>No member found.</div>

  return (
    <Card>
      <CardHeader>
        <CardDescription>{member.id}</CardDescription>
        <CardTitle>{member.name}</CardTitle>
        <CardDescription>{member.description}</CardDescription>
        <Badge variant={member.active ? "default" : "destructive"}>
          {member.active ? "Active" : "Inactive"}
        </Badge>
      </CardHeader>
      <CardContent>
        {/* Add more member details here as needed */}
      </CardContent>
    </Card>
  )
}

