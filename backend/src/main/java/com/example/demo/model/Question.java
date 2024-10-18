package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.List;


@Entity
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String question;
    @NotBlank
    private String subject;
    @NotBlank
    private String questionType;


    @ElementCollection
    private List<String> choices;


    @ElementCollection
    private List<String> correctAnswers;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getQuestion() {
		return question;
	}


	public void setQuestion(String question) {
		this.question = question;
	}


	public String getSubject() {
		return subject;
	}


	public void setSubject(String subject) {
		this.subject = subject;
	}


	public String getQuestionType() {
		return questionType;
	}


	public void setQuestionType(String questionType) {
		this.questionType = questionType;
	}


	public List<String> getChoices() {
		return choices;
	}


	public void setChoices(List<String> choices) {
		this.choices = choices;
	}


	public List<String> getCorrectAnswers() {
		return correctAnswers;
	}


	public void setCorrectAnswers(List<String> correctAnswers) {
		this.correctAnswers = correctAnswers;
	}


	@Override
	public String toString() {
		return "Question [id=" + id + ", question=" + question + ", subject=" + subject + ", questionType="
				+ questionType + ", choices=" + choices + ", correctAnswers=" + correctAnswers + "]";
	}
    
    
}
