package com.smartcity.issues.repository;

import com.smartcity.issues.entity.Notification;
import com.smartcity.issues.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserOrderByCreatedAtDesc(User user);
}
